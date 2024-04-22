const useExponentialBackoff = (
  _fn: any,
  _printDebug: any,
  _maxAttempts = 2,
  _baseDelayMs = 8000
) => {
  let numberOfAttempts = 1;

  const execute: any = async () => {
    try {
      return await _fn();
    } catch (error) {
      if (numberOfAttempts > _maxAttempts) {
        throw error;
      }

      const delayMs = _baseDelayMs * 2 ** numberOfAttempts;
      _printDebug(`Retry attempt ${numberOfAttempts} after ${delayMs}ms`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      numberOfAttempts++;
      return execute();
    }
  };

  return execute();
};

export default useExponentialBackoff;
