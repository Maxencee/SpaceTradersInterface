export interface Cookie {
    name: string,
    value: Object,
    expires: Date,
    path: string
}

export function createCookie (data: Cookie) {
    const d = new Date();
    d.setTime(data.expires.getTime());
    let expires = "expires="+ d.toUTCString();
    document.cookie = data.name + "=" + JSON.stringify(data.value) + ";" + expires + ";path=/";
};

export function getCookie (name: string) : Object|false {
    let cname = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(cname.length, c.length));
      }
    }
    return false;
}