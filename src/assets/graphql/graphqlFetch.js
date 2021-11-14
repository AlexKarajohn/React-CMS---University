import { graphqlUrl } from '../global_vars';

//a fetch function made to target backend graphql api 
const graphqlFetch = async (graphqlQuery) => {
    const token = localStorage.getItem('token');
    return fetch(graphqlUrl,{
        method: 'POST',
        headers: {
            Authorization: token !== null ? 'Bearer ' + token : undefined,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    })
    .then((res)=>{
        return res.json();
    })
}

export default graphqlFetch;