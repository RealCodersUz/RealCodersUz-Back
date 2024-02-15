const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../db");
const config = require("../../shared/config");

/**
 * Post admin
 * @param {express.Request} req
 * @param {express.Response} res
 */

const getAdmin = async (req, res) => {
  try {
    const dbQuery = db("admin").select("id", "username");

    const admin = await dbQuery;

    res.status(200).json({
      admin,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const showAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await db("admin")
      .select("id", "username")
      .where({ id })
      .first();

    if (!admin) {
      return res.status(404).json({
        error: "Admin topilmadi.",
      });
    }

    res.status(200).json({
      admin,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const patchAdmin = async (req, res) => {
  try {
    const { ...changes } = req.body;

    const token = jwt.decode(req.headers.authorization, config.secret);
    console.log("Bu token", token.id);

    const id = token.id;

    const existing = await db("admin").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} - Admin topilmadi.`,
      });
    }

    if (changes.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(changes.password, salt);
      changes.password = hashedPassword;
    }

    const updated = await db("admin")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "username"]);

    res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await db("admin")
      .where({ username })
      .select("id", "password", "username")
      .first();

    if (!existing) {
      return res.status(401).json({
        error: "Введенная информация неверна",
      });
    }

    const match = await bcrypt.compare(password, existing.password);

    if (!match) {
      return res.status(401).json({
        error: "Введенная информация неверна",
      });
    }

    const token = jwt.sign({ id: existing.id }, config.jwt.secret, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,

      admin: {
        id: existing.id,
        username: existing.username,
        role: existing.role,
      },
    });
    console.log(existing);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  patchAdmin,
  getAdmin,
  showAdmin,
};
