const parseJWT = () => {
    const token = localStorage.getItem("token");
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    const jwt = JSON.parse(jsonPayload);
    return jwt;
};

export const validate = (permissions) => {
    const token = localStorage.getItem("token");
    const dataToken = atob(token.split(".")[1]);
    const exp = JSON.parse(dataToken).permissions;
    const permisos = exp.map((permiso) => {
        return permiso.split(".")[0];
    });

    // const found = permissions.every(r => exp.includes(r))
    const found = permissions.some((r) => permisos.includes(r));
    return found;
};

export const validateRoute = () => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const data = atob(token.split(".")[1]);
            const exp = JSON.parse(data).exp;
            if (exp < Date.now() / 1000) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};

export const randomColor = () => {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor}`;
};

export const toBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
};

export const Base64ToFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};
