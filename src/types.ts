export interface Todo {
  id: number;
  title: string;
  details: string;
  isCompleted: boolean;
}

export interface HeadCell {
  id: keyof Todo;
  label: string;
}

export interface GetTasksResponse {
  count: number;
  next: unknown;
  previous: unknown;
  results: Todo[];
  //...
}

// export interface ServerSuccessResponse<T> {
//   success: boolean;
//   content: T;
//   error: [];
// }

// export interface ServerErrorResponse<E> {
//   success: boolean;
//   data: unknown;
//   errors: E[] | GenericErrorResponse[];
// }

export interface GenericErrorResponse {
  code: string;
  message: string;
}

export type SortOrder = "asc" | "desc";
