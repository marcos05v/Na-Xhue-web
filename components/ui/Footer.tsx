export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E7E5E4] py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-[#064E3B] font-black text-2xl">Na Xhue</h3>
          <p className="text-[#A8A29E] text-xs mt-1">
            © 2026 Na Xhue. Precision Logistics for Modern Food Supply Chains.
          </p>
        </div>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Security", "Contact"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-[#78716C] text-sm hover:text-[#064E3B] transition duration-200"
              >
                {link}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}