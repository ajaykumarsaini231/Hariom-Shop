const allImages = [
  "new_computer_set_core_i3_8gb_256gb_warranty_1_year_assembled_24_inch_led_tv_included_₹15999.jpg",
  "new_computer_set_core_i5_8gb_256gb_warranty_1_year_assembled_24_inch_led_tv_included_₹17999.jpg",
  "new_computer_set_core_i7_8gb_256gb_warranty_1_year_assembled_24_inch_led_tv_included_₹19999.jpg",

  "used_asus_expertbook_p2_intel_i5_10th_gen_14_hd_8gb_256gb_₹21999.jpg",
  "used_dell_inspiron_v5581_intel_i5_8th_gen_155_fhd_8gb_256g_₹21999.jpg",

  "used_dell_latitude_3300_intel_i5_8th_gen_133_fhd_8gb_256gb_₹19999.jpg",
  "used_dell_latitude_3340_intel_i5_4th_gen_133_fhd_8gb_256gb_₹15999.jpg",
  "used_dell_latitude_3400_i3_8th_gen_14_hd_8gb_256gb_₹15999.jpg",

  "used_dell_latitude_5310_intel_i5_10th_gen_133_fhd_touchscreen_16gb_256gb_₹32000.jpg",
  "used_dell_latitude_5400_intel_i5_8th_gen_14_fhd_8gb_256gb_₹22999.jpg",
  "used_dell_latitude_5400_intel_i5_8th_gen_14_fhd_touchscreen_8gb_256gb_₹24999.jpg",

  "used_dell_latitude_7410_intel_i5_10th_gen_14_fhd_touchscreen_16gb_512gb_₹29999.jpg",
  "used_dell_latitude_7420_2_in_1_intel_i5_11th_gen_14_fhd_touchscreen_16gb_512gb_₹39999.jpg",
  "used_dell_latitude_7480_i5_6th_gen_14_hd_8gb_256gb_₹19999.jpg",
  "used_dell_latitude_7490_touchscreen_i7_8th_gen_14_hd_16gb_256gb_₹22999.jpg",

  "used_dell_latitude_e5440_i5_4th_gen_14_hd_8gb_256gb_₹13999.jpg",
  "used_dell_latitude_e7270_i5_6th_gen_125_hd_8gb_256gb_₹15999.jpg",
  "used_dell_wyse_5470_celeron_processor_14_hd_8gb_256gb_₹15499.jpg",

  "used_hp_240_g5_intel_i3_6th_gen_14_fhd_8gb_256gb_₹13999.jpg",
  "used_hp_445_g1_amd_a6_processor_14_fhd_8gb_256gb_₹11999.jpg",

  "used_hp_elitebook_1040_g3_i5_6th_gen_14_hd_touchscreen_8gb_256gb_₹21999.jpg",
  "used_hp_elitebook_745_g2_amd_a10_pro_14_hd_8gb_256gb_₹13999.jpg",
  "used_hp_elitebook_745_g6_ryzen_5_pro_14_hd_8gb_256gb_₹21999.jpg",
  "used_hp_elitebook_830_g7_core_i5_10th_generation_133_full_hd_8gb_256gb_₹27999.jpg",

  "used_hp_elitebook_840_g4_intel_i5_7th_gen_14_hd_8gb_256gb_₹19999.jpg",
  "used_hp_elitebook_840_g4_intel_i7_7th_gen_14_hd_8gb_256gb_₹21999.jpg",
  "used_hp_elitebook_840_g4_intel_i7_7th_gen_14_hd_touchscreen_8gb_256gb_₹23999.jpg",

  "used_hp_elitebook_840_g6_intel_i7_8th_gen_14_hd_8gb_256gb_₹25999.jpg",
  "used_hp_elitebook_840_g7_core_i5_10th_generation_14_hd_8gb_256gb_₹29999.jpg",
  "used_hp_elitebook_840_g8_core_i5_11th_generation_14_hd_8gb_256gb_₹31999.jpg",
  "used_hp_elitebook_845_g7_ryzen_5_14_hd_8gb_256gb_₹27999.jpg",

  "used_hp_probook_430_g3_i5_6th_gen_133_hd_touchscreen_8gb_256gb_₹19999.jpg",
  "used_hp_probook_430_g4_i5_7th_gen_14_hd_8gb_256gb_₹17999.jpg",
  "used_hp_probook_430_g5_intel_i5_7th_gen_14_hd_8gb_256gb_₹18499.jpg",
  "used_hp_probook_440_g5_intel_i5_8th_gen_14_hd_8gb_256gb_₹19999.jpg",
  "used_hp_probook_445_g2_amd_a8_pro_14_hd_8gb_256gb_₹12999.jpg",
  "used_hp_probook_445_g8_ryzen_5_pro_14_hd_16gb_256gb_₹27999.jpg",

  "used_hp_probook_x360_435_g7_ryzen_7_pro_133_hd_16gb_512gb_₹31999.jpg",
  "used_hp_probook_x360_435_g8_ryzen_7_pro_11th_gen_133_hd_8gb_256gb_₹29999.jpg",

  "used_lenovo_ideapad_330s_core_i3_8th_gen_14_hd_8gb_256gb_₹16999.jpg",
  "used_lenovo_ideapad_330_core_i3_7th_gen_156_hd_8gb_256gb_₹15999.jpg",
  "used_lenovo_ideapad_g50_80_core_i3_156_hd_8gb_256gb_₹12999.jpg",
  "used_lenovo_ideapad_s145_core_i3_7th_gen_156_hd_8gb_256gb_₹17999.jpg",

  "used_lenovo_thinkpad_t450_i5_5th_gen_14_hd_8gb_256gb_₹13999.jpg",
  "used_lenovo_thinkpad_t495_ryzen_5_14_hd_8gb_256gb_₹17999.jpg",

  "used_macbook_air_a1466_model_13_display_intel_i5_8gb_128gb_₹24999.jpg",
  "used_macbook_pro_touchbar_a1990_model_15_display_intel_i7_16gb_256gb_₹39999.jpg",
  "used_macbook_pro_touchbar_a2141_model_2019_16_display_intel_i7_16gb_512gb_₹44999.jpg"
];
