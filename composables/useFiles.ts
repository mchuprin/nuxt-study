import { ref, useContext } from '@nuxtjs/composition-api';

export const useGetFiles = () => {
  const { $axios } = useContext();
  const isLoading = ref(false);
  const result = ref(null);
  const error = ref(null);

  const fetch = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await $axios.get('/api/files');
      result.value = response.data;
    } catch (e) {
      error.value = e;
      result.value = null;
    } finally {
      isLoading.value = false;
    }
  }
  return { getFiles: fetch, gotFiles: result, gettingFilesError: error, gettingFilesLoading: isLoading }
}

export const useSendFiles = () => {
  const { $axios } = useContext();
  const isLoading = ref(false);
  const result = ref(null);
  const error = ref(null);

  const fetch = async(data: any) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await $axios.post('/api/files',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      result.value = response.data;
    } catch (e) {
      error.value = e;
      result.value = null;
    } finally {
      isLoading.value = false;
    }
  }
  return { sendFiles: fetch, sentFiles: result, sendingFilesError: error, sendingFilesLoading: isLoading }
}

