const getFormData = (
  record: Record<string, File | File[] | string | string[] | undefined>,
) => {
  const formData = new FormData();

  const append = (key: string, value: File | string) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  };

  Object.entries(record).forEach(([key, values]) => {
    if (!values) {
      return;
    }

    if (Array.isArray(values)) {
      values.forEach((value) => {
        append(key + "[]", value);
      });
    } else {
      append(key, values);
    }
  });

  return formData;
};

export { getFormData };
