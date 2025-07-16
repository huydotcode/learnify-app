const footerData = [
  {
    heading: "Về chúng tôi",
    links: [
      { name: "Giới thiệu", url: "/about" },
      { name: "Đội ngũ", url: "/team" },
      { name: "Liên hệ", url: "/contact" },
    ],
  },
  {
    heading: "Hỗ trợ",
    links: [
      { name: "Trợ giúp", url: "/help" },
      { name: "FAQs", url: "/faqs" },
      { name: "Chính sách bảo mật", url: "/privacy" },
      { name: "Điều khoản sử dụng", url: "/terms" },
    ],
  },
  {
    heading: "Kết nối với chúng tôi",
    links: [
      { name: "Facebook", url: "https://www.facebook.com/learnify" },
      { name: "Twitter", url: "https://twitter.com/learnify" },
      { name: "Instagram", url: "https://www.instagram.com/learnify" },
      { name: "LinkedIn", url: "https://www.linkedin.com/company/learnify" },
    ],
  },
  {
    heading: "Khác",
    links: [
      { name: "Blog", url: "/blog" },
      { name: "Sự kiện", url: "/events" },
      { name: "Tin tức", url: "/news" },
      { name: "Cộng đồng", url: "/community" },
      { name: "Hỗ trợ", url: "/support" },
      { name: "Tài nguyên", url: "/resources" },
      { name: "Đối tác", url: "/partners" },
      { name: "Tuyển dụng", url: "/careers" },
      { name: "Đóng góp", url: "/contribute" },
      { name: "Bản tin", url: "/newsletter" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-muted py-4">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="text-start text-lg font-semibold mb-2">
                {section.heading}
              </h3>
              <ul className="list-none p-0 text-start">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-1">
                    <a
                      href={link.url}
                      className="text-black"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-sm">
          &copy; {new Date().getFullYear()} Learnify. All rights reserved.
        </p>
        <p className="text-xs mt-2">Made with ❤️ by Ngo Nhut Huy</p>
      </div>
    </footer>
  );
};

export default Footer;
