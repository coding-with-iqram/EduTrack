import React from "react";

export const VeryShortQuestions = [
  {
    question: "What is the difference between Linear Layout and Relative Layout?",
    answer:
      "Linear Layout arranges elements is single direction (horizontal or vertical), where as Relativ Layout positions elements relative to each other. With Relative Layout, you can create dynamic layouts similar to Flexbox.",
    years: [2022, 2023],
  },
  {
    question: "What is the difference between ImageView and ImageSwitcher?",
    answer:
      "ImageView is used to display a static image, while ImageSwitcher is used to switch between multiple images. It allows animated transitions between images.",
    years: [2021, 2023],
  },
  {
    question: "How does GridView work and where is it used?",
    answer:
      "GridView is a UI component that helps display data in a grid format. It is commonly used in gallery apps, product listings, or dashboards where multiple items need to be shown together.",
    years: [2020],
  },
  {
    question: "What is the purpose of XML layout files?",
    answer:
      "XML layout files are used in Android apps to define UI components. They help separate the overall design of the app from the code, allowing UI to be managed independently.",
    years: [2019, 2022],
  },
  {
    question: "What customizations are possible for Android UI?",
    answer:
      "Various customizations are possible in Android UI, such as:\n- Creating custom views\n- Using styles and themes\n- Adding animations and transitions\n- Customizing fonts and colors",
    years: [2023],
  },
  {
    question: "What are some common Android UI issues and how can they be solved?",
    answer:
      "Common issues include:\n- UI Overlapping: Can be fixed by properly using margins and paddings.\n- Image Load Issue: Use libraries like Glide or Picasso.\n- Slow Rendering: Use RecyclerView for faster UI loading.\n- Compatibility Issue: Ensure android:targetSdkVersion is correctly set.",
    years: [2020],
  },
];

export const ShortQuestions = [
  {
    question: "What is RecyclerView?",
    answer:
      "RecyclerView is an advanced ViewGroup in Android used for efficiently displaying dynamic and large datasets. It is a more flexible and performance-optimized replacement for ListView, offering features such as view recycling and layout customization.\nKey Features of RecyclerView:\n1. View Recycling: Reuses views that are no longer visible to display new content, improving memory usage and scroll performance.\n2. Layout Management: Supports various layout managers like LinearLayoutManager, GridLayoutManager, and StaggeredGridLayoutManager for creating different types of item arrangements.\n3. Customization: Offers full UI control through the use of Adapter and ViewHolder classes.\n4. Item Animation: Built-in support for animations when items are added, removed, or updated, enhancing user interaction.",
    years: [2019, 2022],
  },
  {
    question: "What are the advantages of Jetpack Compose?",
    answer:
      "Jetpack Compose is a modern, declarative UI toolkit for Android that simplifies and accelerates UI development using Kotlin instead of traditional XML layouts.\nKey Advantages of Jetpack Compose:\n1. Less Code: Eliminates the need for XML, reducing boilerplate and enabling faster development with concise Kotlin code.\n2. Reactive UI: Automatically updates UI elements in response to data or state changes, streamlining dynamic UI behavior.\n3. Reusable Components: Encourages modular and reusable UI elements through composable functions.\n4. Interoperability: Easily integrates with existing XML-based UIs, supporting gradual migration.\n5. Material Design Support: Provides built-in components that adhere to Material Design principles, ensuring modern and consistent UI experiences.",
    years: [2019],
  },
  {
    question: "What is a Composable?",
    answer:
      "Composable is a function in Jetpack Compose, the modern declarative UI toolkit for Android. Composable functions define the layout and behavior of UI components directly using Kotlin code, enabling dynamic and efficient user interface development.\nKey Features of Composables:\n1. Dynamic UI Creation: UI can be updated programmatically and responsively using Composable functions.\n2. Clean Coding Style: Eliminates the need for XML by using Kotlin, making the UI code more concise and readable.\n3. State Management: Reacts to state changes automatically, ensuring the UI stays in sync with application data.\n4. Reusable Components: Composable functions can be reused across different screens or parts of the app, promoting modular and maintainable code.",
    years: [2018, 2022],
  },
  {
    question: "What are the advantages of XML Layout?",
    answer:
      "XML Layout is the traditional approach to defining user interfaces in Android development using Extensible Markup Language (XML). It provides a clear and structured way to design the UI separately from application logic.\nAdvantages of XML Layout:\n1. Separation of Design & Code: Keeps UI design distinct from application logic, improving maintainability and collaboration between designers and developers.\n2. Static Layout: Allows developers to define a fixed layout structure, which helps ensure consistency and predictability in design.\n3. Drag-and-Drop Support: Android Studio’s visual editor enables developers to design interfaces easily using drag-and-drop tools.\n4. Predefined Widgets: Offers a wide range of built-in widgets like Buttons, TextViews, and ImageViews, simplifying UI development.",
    years: [2017, 2022],
  },
  {
    question: "Write a short note on GridView and RecyclerView.",
    answer:
      "GridView and RecyclerView are adapter views used to display lists of items in rows or columns.\nGridView:\nGridView shows data in a two-dimensional grid. RecyclerView is more advanced, efficient, and customizable using LayoutManagers and Adapters.\nRecyclerView:\nThis is an advanced and more flexible version of ListView and GridView. It supports better performance and customization. RecyclerView uses a LayoutManager to define the layout style (like linear or grid). It also supports features like animation and efficient scrolling.",
    years: [2019, 2022],
  },
  {
    question: "Write a short note on Jetpack Compose.",
    answer:
      "Jetpack Compose is a modern Android UI toolkit designed to simplify Android UI development.\n1. It follows a declarative approach, making UI development easier and more intuitive.\n2. Unlike traditional methods, there is no need for XML to define UI components.\n3. It allows developers to build UI faster with less code.\n4. UI components are created using composable functions, which are reusable and easy to manage.",
    years: [2019, 2024],
  },
];

function PreviousQuestions() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Previous Year Questions</h2>

      {/* অতি সংক্ষিপ্ত প্রশ্ন */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Very Short Questions</h3>
        {VeryShortQuestions.map((q, index) => (
          <div key={index} className="mb-4 p-4 border rounded shadow-sm">
            <p className="font-medium">Q{index + 1}. {q.question}</p>
            <p className="text-gray-700 whitespace-pre-line mt-1">Answer: {q.answer}</p>
            <p className="text-sm text-gray-500 mt-1">Years: {q.years.join(', ')}</p>
          </div>
        ))}
      </div>

      {/* সংক্ষিপ্ত প্রশ্ন */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Short Question</h3>
        {ShortQuestions.map((q, index) => (
          <div key={index} className="mb-4 p-4 border rounded shadow-sm">
            <p className="font-medium">Q{index + 1}. {q.question}</p>
            <p className="text-gray-700 whitespace-pre-line mt-1">Answer: {q.answer}</p>
            <p className="text-sm text-gray-500 mt-1">Years: {q.years.join(', ')}</p>
          </div>
        ))}
      </div>

      {/* ভবিষ্যতে রচনামূলক প্রশ্ন এখানে যোগ করা যাবে */}
    </div>
  );
}

export default PreviousQuestions;
