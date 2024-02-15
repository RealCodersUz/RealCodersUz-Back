const { default: knex } = require("knex");
const db = require("../../db/index");
const { siteUrl } = require("../../shared/config");
// const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getServices = async (req, res, next) => {
  try {
    // const a = await db.select().from("services");
    const services = await db("services")
      .leftJoin("images", "images.id", "news.news_img_id")
      .select(
        "services.id",
        //
        "services.title_uz",
        "services.title_ru",
        "services.title_en",

        "services.desc_uz",
        "services.desc_ru",
        "services.desc_en",

        "services.created_at",
        //
        "images.image_url"
      )
      .orderBy("services.id", "asc")
      .groupBy("services.id", "images.id");

    console.log(services);
    res.json(services);
  } catch (error) {
    console.log("err shu yerdan");
    throw error;
  }
};

const showServices = async (req, res, next) => {
  try {
    const { id } = req.params;
    const services = await db("services")
      .select("*")
      .where({ "services.id": id })

      .first();
    if (!services) {
      return res.status(404).json({
        error: `${id} - не найдено`,
      });
    }

    return res.status(200).json({
      message: "успешно",
      data: [services],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

const patchServices = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("services").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} не найдено`,
      });
    }

    const updated = await db("services")
      .where({ id })
      .update({ ...changes })
      .returning(["*"]);
    res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
const postServices = async (req, res, next) => {
  try {
    const {
      id,
      //
      title_uz,
      title_ru,
      title_en,

      desc_uz,
      desc_ru,
      desc_en,

      location,

      phone_number,
      addition_number,
    } = req.body;

    const services = await db("services")
      .insert({
        id,
        title_uz,
        title_ru,
        title_en,

        desc_uz,
        desc_ru,
        desc_en,

        location,

        phone_number,
        addition_number,
      })
      .returning(["*"]);

    res.status(200).json({
      data: [...services],
    });
  } catch (error) {
    console.log(error);
    // throw new NotFoundErr("something went wrong");
    res.send(error);
  }
};
const deleteServices = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("services").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} не найдено`,
      });
    }

    const del = await db("services").where({ id }).returning(["*"]).del();

    res.status(200).json({
      message: "Удалено успешно",
      deleted: del,
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};
module.exports = {
  getServices,
  postServices,
  showServices,
  patchServices,
  deleteServices,
};

// phone_number
