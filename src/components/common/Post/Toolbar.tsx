const Toolbar = () => {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
      ],
    },
  };

  return modules;
};

export default Toolbar;
