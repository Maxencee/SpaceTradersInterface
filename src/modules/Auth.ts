import Request from "../modules/Request.ts";

export interface Agent {
    accountId: string
    symbol: string,
    headquarters: string,
    credits: number,
    startingFaction: string,
    shipCount: number 
}

export async function login (token: string): Promise<Agent|false> {
    const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      };

      const response = await Request('https://api.spacetraders.io/v2/my/agent', options);

      if(response.error) {
        localStorage.removeItem('usertoken');
        return false;
      } else {
        return response.data;
      }
}

export async function register (token: string): Promise<Agent|false> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol: token,
        faction: "COSMIC",
      }),
    };

    const response = await Request('https://api.spacetraders.io/v2/register', options);
    
    if (response.error) {
        return false;
    } else {
      localStorage.setItem('usertoken', response.data.token);
        return response.data;
    }
}