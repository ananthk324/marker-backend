const {
  badRequestTemplate,
  dataTemplate,
  serverErrorTemplate,
} = require("../../utils/responseTemplates");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const { Attendance } = require("../../models");

dayjs.extend(utc);
dayjs.extend(timezone);

const markAttendance = async (req, res) => {
  try {
    const { id } = req.user;
    const { day } = req.params;
    const body = req.body;

    console.log(day);

    console.log(body);

    if (!day) return badRequestTemplate(res, "No date found in req.");

    if (body.leave && !(body.half_day || body.full_day)) {
      return badRequestTemplate(res, "Missing leave type in req.");
    }

    const ISTDate = dayjs.utc().tz("Asia/Kolkata").isSame(day, "d");

    if (!ISTDate)
      return badRequestTemplate(res, "Cannot mark for another day.");

    const ISTDateFormatted = dayjs
      .utc(day)
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD");

    const hasUserMarked = await Attendance.findOne({
      where: { userId: id, day },
    });

    if (hasUserMarked)
      return badRequestTemplate(
        res,
        "You have already marked the attendance for today."
      );

    const attendanceObject = {
      day: ISTDateFormatted,
      userId: id,
      marked_timestamp: new Date().toISOString(),
      present: body.leave ? false : true,
      leave: body.leave ? true : false,
      leave_half_day: body.half_day ? true : false,
      leave_full_day: body.full_day ? true : false,
      leave_type: body.leave ? (body.half_day ? "half" : "full") : null,
    };

    const markToday = await Attendance.create(attendanceObject);

    if (!markToday) return serverErrorTemplate(res, "Failed to mark.");

    return dataTemplate(
      res,
      { marked: true, present: body.leave ? false : true },
      { message: "Marked!" }
    );
  } catch (e) {
    console.log(e);
    return serverErrorTemplate(res, e.message);
  }
};

module.exports = { markAttendance };
