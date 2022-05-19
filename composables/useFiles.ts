import {ref, useContext, useStore} from '@nuxtjs/composition-api';

export const useGetFiles = () => {
  const { $axios } = useContext();
  const isLoading = ref(false);
  const result = ref(null);
  const error = ref(null);

  const fetch = async (): Promise<void> => {
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
  return { fetch, result, error, isLoading }
}

export const useSendFiles = () => {
  const { $axios } = useContext();
  const isLoading = ref(false);
  const result = ref(null);
  const error = ref(null);

  const fetch = async(data: FormData): Promise<void> => {
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
  return { fetch, result, error, isLoading }
}

export const useDeleteFiles = () => {
  const { getters } = useStore();
  const { $axios } = useContext();

  const isLoading = ref(false);
  const error = ref(null);

  const fetch = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    try {
      await $axios.delete(`/api/files?files=${getters.getSelectedFiles.join(',')}`)
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  }
  return { fetch, error, isLoading }
}

