interface ErrorResponse {
  response: {
    status: number;
    data: {
      error: string;
      Info: string
    };
  };
}

export function validateResponse(error: ErrorResponse) {
  if (error.response.status !== 200) {
    throw new Error(error.response.data.error);
  } else {
    throw new Error("Произошла неизвестная ошибка.");
  }
}