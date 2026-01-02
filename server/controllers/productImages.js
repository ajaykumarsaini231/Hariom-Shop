const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all images for a specific product
async function getSingleProductImages(request, response) {
  const { id } = request.params;
  
  try {
    const images = await prisma.image.findMany({
      where: { productId: id },
    });
    
    if (!images) {
      return response.status(404).json({ error: "Images not found" });
    }
    return response.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    return response.status(500).json({ error: "Error fetching images" });
  }
}

// Create one or multiple images
async function createImage(request, response) {
  try {
    const { productId, image, images } = request.body;

    if (!productId) {
      return response.status(400).json({ error: "Product ID is required" });
    }

    // Prepare data array: supports both "images" (array) and "image" (single)
    let imagesToCreate = [];

    if (images && Array.isArray(images)) {
      // Handle array of objects [{image: 'url'}] or strings ['url']
      imagesToCreate = images.map((item) => ({
        productId,
        image: typeof item === 'string' ? item : item.image,
      }));
    } else if (image) {
      // Handle single image
      imagesToCreate.push({
        productId,
        image: typeof image === 'string' ? image : image.image,
      });
    }

    if (imagesToCreate.length === 0) {
      return response.status(400).json({ error: "No image data provided" });
    }

    // Bulk create
    const createdImages = await prisma.image.createMany({
      data: imagesToCreate,
    });

    return response.status(201).json({ 
        message: "Images added successfully", 
        count: createdImages.count 
    });

  } catch (error) {
    console.error("Error creating image:", error);
    return response.status(500).json({ error: "Error creating image" });
  }
}

// Replace images for a product (Delete old -> Create new)
async function updateImage(request, response) {
  try {
    const { id } = request.params; // Using 'id' as ProductID based on your router
    const { image, images } = request.body;

    // 1. Check if product exists (Optional, but good practice)
    const productExists = await prisma.product.findUnique({ where: { id } });
    if (!productExists) {
        return response.status(404).json({ error: "Product not found" });
    }

    // 2. Transaction: Delete all old images for this product, then add new ones
    // This ensures we don't have orphaned images or duplicates
    await prisma.$transaction(async (tx) => {
        // Delete existing
        await tx.image.deleteMany({
            where: { productId: id }
        });

        // Prepare new data
        let imagesToCreate = [];
        if (images && Array.isArray(images)) {
            imagesToCreate = images.map((item) => ({
                productId: id,
                image: typeof item === 'string' ? item : item.image,
            }));
        } else if (image) {
            imagesToCreate.push({
                productId: id,
                image: typeof image === 'string' ? image : image.image,
            });
        }

        // Create new
        if (imagesToCreate.length > 0) {
            await tx.image.createMany({
                data: imagesToCreate
            });
        }
    });

    // 3. Return the updated list of images
    const updatedImages = await prisma.image.findMany({
        where: { productId: id }
    });

    return response.json(updatedImages);

  } catch (error) {
    console.error("Error updating images:", error);
    return response.status(500).json({ error: "Error updating images" });
  }
}

// Delete all images for a product
async function deleteImage(request, response) {
  try {
    const { id } = request.params;
    
    await prisma.image.deleteMany({
      where: {
        productId: String(id),
      },
    });
    
    return response.status(204).send();
  } catch (error) {
    console.error("Error deleting image:", error);
    return response.status(500).json({ error: "Error deleting image" });
  }
}

module.exports = {
  getSingleProductImages,
  createImage,
  updateImage,
  deleteImage,
};