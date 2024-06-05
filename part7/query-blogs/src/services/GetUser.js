import { useQuery } from '@tanstack/react-query'
import login from '../services/login'

const GetUser =  ({ username, password }) => {
    const { isLoading, isError, data, error } = useQuery([username],
        async () => await login(username, password)
      )
    
      if (isLoading) {
        return <div>...</div>
      }
    
      if (isError) {
        return <div>{error?.message}</div>
      }
          
    return (
        <div>
        <h2>{data.user}</h2>
      </div>
    );
    }
    export default GetUser;