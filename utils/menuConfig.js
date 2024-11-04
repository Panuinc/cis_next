const menuHeader = {
  hr: { nameTH: "บุคคล", link: "hr" },
  it: { nameTH: "เทคโนโลยีสารสนเทศ", link: "it" },
};

const menuItems = {
  hr: [
    { nameTH: "สาขา", link: "branch" },
    { nameTH: "ฝ่าย", link: "division" },
    { nameTH: "แผนก", link: "department" },
    { nameTH: "ตำแหน่ง", link: "position" },
    { nameTH: "บทบาทหน้าที่", link: "role" },
    { nameTH: "ไซต์งาน", link: "site" },
    { nameTH: "พนักงาน", link: "user" },
    { nameTH: "หลักสูตรอบรม", link: "training" },
    { nameTH: "หนังสือตักเตือน", link: "warning_letter" },
    { nameTH: "หัวข้อใบเตือน", link: "warning_topic" },
    { nameTH: "ระเบียบข้อบังคับ", link: "warning_detail" },
  ],
  it: [
    { nameTH: "การบำรุงรักษา", link: "maintenance" },
    { nameTH: "การสำรองข้อมูล", link: "backup" },
    { nameTH: "อุปกรณ์", link: "equipment_asset" },
    { nameTH: "ชนิดอุปกรณ์", link: "equipment_type" },
    { nameTH: "ยี่ห้อของอุปกรณ์", link: "equipment_brand" },
    { nameTH: "หน้าหลัก", link: "/" },
  ],
};

export { menuHeader, menuItems };
