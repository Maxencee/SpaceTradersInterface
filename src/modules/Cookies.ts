export interface Cookie {
    name: string,
    value: Object|string,
    expires: number,
    path: string
}

export function createCookie (data: Cookie) {
    const d = new Date();
    d.setTime(d.getTime() + data.expires);
    let expires = "expires="+ d.toUTCString();
    document.cookie = data.name + "=" + JSON.stringify(data.value) + ";" + expires + ";path=/";
};

export function deleteCookie(name: string) {
  createCookie({
    name: name, 
    value: "",
    expires: -3600 * 24,
    path: "/"
  })
}

export function getCookie (name: string) : any|false {
    let cname = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return false;
}