import React, { useState } from "react";

// Accordion Item Component
const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden bg-white shadow-sm">

      <button
        type="button"
        onClick={onClick}
        className="w-full flex justify-between items-center p-5 bg-gray-100 hover:bg-gray-200 transition"
      >
        <span className="font-bold text-left text-lg text-gray-800">
          {title}
        </span>

        <span className="text-2xl text-blue-600 font-bold">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="p-6 border-t text-gray-700 leading-relaxed bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

// Main Page Component
const PropertyTermsBangla = () => {

  const [openSection, setOpenSection] = useState(1);

  const toggleSection = (index) => {
    if (openSection === index) {
      setOpenSection(null);
    } else {
      setOpenSection(index);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-10 border-b pb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            বাংলাদেশে সম্পত্তি হস্তান্তরের সাধারণ শর্তাবলী
          </h1>

          <p className="text-gray-600 text-lg">
            সম্পত্তি ক্রয়, বিক্রয়, বুকিং এবং ভাড়ার গুরুত্বপূর্ণ আইনি নির্দেশনা
          </p>
        </div>

        {/* ACCORDIONS */}

        <AccordionItem
          title="১. সম্পত্তি ক্রয়-বিক্রয়ের সাধারণ শর্তাবলী"
          isOpen={openSection === 1}
          onClick={() => toggleSection(1)}
        >
          <ul className="list-disc pl-6 space-y-3">

            <li>
              <strong>মালিকানার সত্যতা:</strong>
              {" "}বিক্রেতাকে বৈধ মালিক হতে হবে।
            </li>

            <li>
              <strong>বায়না চুক্তি:</strong>
              {" "}১০%-৩০% অগ্রিম প্রদান করা হয়।
            </li>

            <li>
              <strong>রেজিস্ট্রেশন:</strong>
              {" "}দলিল রেজিস্ট্রি বাধ্যতামূলক।
            </li>

            <li>
              <strong>দখল:</strong>
              {" "}পূর্ণ মূল্য পরিশোধের পর দখল বুঝিয়ে দিতে হবে।
            </li>

          </ul>
        </AccordionItem>

        <AccordionItem
          title="২. ফ্ল্যাট বা অ্যাপার্টমেন্ট বুকিংয়ের শর্তাবলী"
          isOpen={openSection === 2}
          onClick={() => toggleSection(2)}
        >
          <ul className="list-disc pl-6 space-y-3">

            <li>বুকিং মানি ও ডাউনপেমেন্ট প্রদান করতে হবে।</li>

            <li>নির্ধারিত সময়ে কিস্তি পরিশোধ করতে হবে।</li>

            <li>বিলম্বে জরিমানা প্রযোজ্য হতে পারে।</li>

            <li>ইউটিলিটি চার্জ আলাদা হতে পারে।</li>

          </ul>
        </AccordionItem>

        <AccordionItem
          title="৩. বাসা বা দোকান ভাড়ার শর্তাবলী"
          isOpen={openSection === 3}
          onClick={() => toggleSection(3)}
        >
          <ul className="list-disc pl-6 space-y-3">

            <li>১-৩ মাসের অগ্রিম জামানত লাগতে পারে।</li>

            <li>ভাড়া নির্ধারিত সময়ে পরিশোধ করতে হবে।</li>

            <li>চুক্তি বাতিলের আগে নোটিশ দিতে হবে।</li>

            <li>সাব-লেট সাধারণত নিষিদ্ধ থাকে।</li>

          </ul>
        </AccordionItem>

        {/* FOOTER CARD */}

        <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-xl p-6">

          <h3 className="text-xl font-bold text-yellow-800 mb-3">
            ⚠️ গুরুত্বপূর্ণ আইনি পরামর্শ
          </h3>

          <p className="text-yellow-700 leading-relaxed">
            যেকোনো সম্পত্তি ক্রয়ের আগে অবশ্যই দলিল, খতিয়ান,
            নামজারি ও অন্যান্য কাগজপত্র আইনজীবী দ্বারা যাচাই করিয়ে নিন।
            এক্ষেত্রে, নির্দিষ্ট সার্ভিস ফী প্রদানের মাধ্যমে আমাদের সেবা পেতে পারেন ।
          </p>

        </div>

      </div>

    </div>
  );
};

export default PropertyTermsBangla;