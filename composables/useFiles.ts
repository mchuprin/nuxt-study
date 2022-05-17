export const useFilesToFormData = (files: any) => {
  let formData = new FormData();
  [...files].forEach((file, index) => {
    formData.append(`file${index+1}`, file)
  })
  return formData;
}
