

export class User {
    private id: number;
    private username: string;
    private email: string;
    private password: string;

    constructor(username: string, email: string, password: string){
        this.id = Math.floor(Math.random() * 10000);
        this.username = username;
        this.email = email;
        this.password = password;
    }

    getId(){
        return this.id;
    }

    setId(id: number){
        this.id = id;
    }

    getUsername(){
        return this.username;
    }

    setUsername(username: string){
        this.username = username;
    }

    getEmail(){
        return this.email;
    }

    setEmail(email: string){
        this.email = email;
    }

    getPassword(){
        return this.password;
    }

    setPassword(password: string){
        this.password = password;
    }

}