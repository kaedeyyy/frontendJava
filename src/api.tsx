export const signupUser = async(argEmail: string,argPass: string) => {
    const url :string = "http://localhost:8888/signup";
    const params = {
        method : "POST", 
        headers:{
            'Content-Type': 'application/json'
        } ,
        body : JSON.stringify({mail : argEmail, pass: argPass})
    };

    const response = await fetch(url, params);

    //String型のレスポンスを取得できる
    //const returnText = await response.text();
    const returnJson = await response.json();
    console.log(response);
    console.log(response.body);
    console.log(returnJson);

};