import db from '../database/db'; 
import { User } from "./UsersEntitie";

interface UserRow {
    id: number;
    username: string;
    email: string;
    password: string;
}

export class UserUseCase {
    
    async createUser(username: string, email: string, password: string) {
        return new Promise<User>((resolve, reject) => {
            const sql = `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`;
            db.run(sql, [username, email, password], function (err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    
                    const newUser = new User(username, email, password);
                    newUser.setId(this.lastID);
                    resolve(newUser);
                    console.log("User criado com sucesso")
                }
            });
        });
    }

    async readAllUser() {
        console.log('Executando readAllUser...'); 
    
        return new Promise<User[]>((resolve, reject) => {
            const sql = `SELECT * FROM user`;
            console.log('Consulta SQL:', sql);
    
            db.all(sql, [], (err: Error | null, rows: UserRow[]) => {
                if (err) {
                    console.error('Erro ao buscar users:', err);
                    reject(err);
                } else {
                    console.log('Linhas retornadas:', rows);
    
                    const users = rows.map((row) => {
                        const user = new User(row.username, row.email, row.password);
                        user.setId(row.id);
                        return user;
                    });
                    resolve(users);
                }
            });
        });
    }
    
}
