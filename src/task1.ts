interface UserData {
    userId: number,
    id: number,
    title: string,
    body: string
}

const API_URL:string = "https://jsonplaceholder.typicode.com/posts"
const container: HTMLElement = document.getElementById('card-item')!;

async function getDataFromServer(): Promise<UserData[]>  {
    try {
        const response: Response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const result:Array<UserData> = await response.json()
        return result
    } catch (error: any) {
        throw new Error(error.message)
    }
}

function createDOMNodes(posts: Array<UserData>): void {
    container.innerHTML = '';
    posts?.forEach((post: UserData) => {
        const postElement: HTMLDivElement = document.createElement('div');
        postElement.innerHTML = `
      <h2>${post?.title}</h2>
      <h3>UserId: ${post?.userId}</h3>
      <h3>Id: ${post?.id}</h3>
      <p>${post?.body}</p>
    `;
        container.appendChild(postElement);
    });
}

async function renderDOMNodes(): Promise<void> {
    try {
        const posts: Array<UserData> = await getDataFromServer()
        createDOMNodes(posts)
    } catch (error: any) {
        container.innerHTML = `<h2 style="color: red">${error.message}</h2>`
    }
}

async function updateDOMNodes(): Promise<void> {
    try {
        const posts: Array<UserData> = await getDataFromServer()
        const updatedArray: Array<UserData> = updateObjectInArray<UserData>(posts, 'id', 3,
            { title: 'Updated title', body: 'Updated body'});
        createDOMNodes(updatedArray)
    } catch (error: any) {
        container.innerHTML = `<h2 style="color: red">${error.message}</h2>`
    }

}

renderDOMNodes()
updateDOMNodes()
