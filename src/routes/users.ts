import { Router } from "express";
import type { Request, Response } from "express";
import pool from "../db/connection.js";

const router = Router();

router.get("/api/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT * FROM users
            ORDER BY id;
            `)
        res.json({
            success: true,
            data: result.rows,
            count: result.rowCount
        });
    } catch (err) {
        console.error('Error fetching users: ', err);
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
});

router.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await pool.query(`
            SELECT * FROM users
            WHERE id = ${id} 
            `)

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        };

        res.json({
            success: true,
            data: result.rows,
            count: result.rowCount
        });
    } catch (err) {
        console.error("Error fetching specific user: ", err)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})

router.put("/api/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        // method 1
        // const result = await pool.query(`
        //     UPDATE users
        //     SET name = '${name}', email = '${email}'
        //     WHERE id = ${id}
        //     RETURNING *;
        // `)

        // method 2
        const result = await pool.query(`
            UPDATE users
            SET name = $1, email = $2
            WHERE id = $3
            RETURNING *;
        `, [name, email, id])

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            message: 'User updated successfully',
            data: result.rows
        });
    } catch (err) {
        console.error("Error fetching specific user: ", err)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})

router.post("/api/users/add_user", async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            })
        };

        const result = await pool.query(`
            INSERT INTO users (name, email)
            VALUES ('${name}', '${email}')
            RETURNING *
        `)

        res.json({
            success: true,
            message: "User added successfully",
            data: result.rows
        });
        
    } catch (err) {
        console.error("Error fetching specific user: ", err)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})

router.delete("/api/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            DELETE FROM users
            WHERE id = ${id}
            RETURNING *;
        `)

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            message: 'User deleted successfully',
            data: result.rows
        });
    } catch (err) {
        console.error("Error fetching specific user: ", err)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
})  
    

export default router