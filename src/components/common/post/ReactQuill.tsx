const Toolbar = () => {
  const modules = {
    toolbar: {
      container: [
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline"],
        ["blockquote"],
        ["link"],
        [{ list: "ordered" }, { list: "bullet" }],

        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    },
  };

  return modules;
};

export default Toolbar;
