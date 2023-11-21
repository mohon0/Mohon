interface EditPostErrors {
  title?: string;
  categories?: string;
  content?: string;
}

interface EditPostValidationProps {
  title: string;
  categories: string;
  content: string;
}

function EditPostValidation({
  title,
  categories,
  content,
}: EditPostValidationProps): EditPostErrors {
  const errors: EditPostErrors = {};

  // validate title field
  if (!title.trim()) {
    errors.title = "Title is required";
  } else if (title.trim().length < 4) {
    errors.title = "Title must be at least 4 characters long";
  } else if (title.trim().length > 300) {
    errors.title = "Title can not be longer than 300 characters";
  }

  // validate categories field
  if (!categories.trim()) {
    errors.categories = "Category is required";
  }

  return errors;
}

export default EditPostValidation;
