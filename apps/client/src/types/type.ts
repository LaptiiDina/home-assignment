export interface Book{
    id: number,
    title: string,
    author: string,
    price: number,
    quantity: number
}
export type CreateBookType = Omit<Book, "id">;
export type BooksListProp = {
     books: Book[];
     handleClickUpdateBook: () => void
     handleClickAddBook: () => void
}

export type EmptyListProp = {
    handleClickAddBook: () => void
}
