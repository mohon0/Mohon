interface Errors {
  title?: string;
  categories?: string;
  content?: string;
  files?: string;
}

interface Props {
  title: string;
  categories: string;
  content: string;
  files: FileList | null;
}

export default function NewPostValidation({
  title,
  categories,
  content,
  files,
}: Props): Errors {
  const errors: Errors = {};

  // validate title field
  if (!title.trim()) {
    errors.title = "Title is required";
  } else if (title.trim().length < 4) {
    errors.title = "Title must be at least 4 characters long";
  } else if (title.trim().length > 300) {
    errors.title = "Title cannot be longer than 300 characters";
  } else if (title.includes("_")) {
    errors.title = "Title cannot contain underscores";
  }

  // validate categories field
  if (!categories || categories.length === 0) {
    errors.categories = "Category is required";
  }

  // validate image field
  if (!files || files.length === 0) {
    errors.files = "Image is required";
  }

  return errors;
}
