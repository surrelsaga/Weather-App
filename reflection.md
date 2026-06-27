1. second commit: 
=> even if I tell async function to return 1; 
=> it won't return 1 but a Promise object, with 1 wrapped inside
=> lesson: async func will always return a Promise object

2. async is infectious
=> once a function is async, if want to access (e.g: an object) as return of the async function
=> have the use await/then(catch) to get the object wrapped inside the return promise
=> everything will become async not sync

3. a form is by default, must send data to somewhere else
=> everytime it sends data, the whole page is reloaded
=> to prevent this behavior, need event.preventDefault()

4. calling an API endpoint, if no data is found, the return http status will be 200 (which is ok) => just need to check !response.ok to know

5. .finally() of Promise can also be used in async/await syntax try,catch
=> finally after try/catch which has the same meanings as .finally() which is always run regardless of the promise states(fulfilled, rejected)

6. Before: toggle unit requires fetching the data from API again
=> solution: split the rendering and loading data 
=> load once then store the data
=> whenever need rerender, just take that stored data and render
