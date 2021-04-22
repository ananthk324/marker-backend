const {
  dataTemplate,
  serverErrorTemplate,
} = require("../../utils/responseTemplates");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const { Attendance } = require("../../models");

dayjs.extend(utc);
dayjs.extend(timezone);

const todaysStatus = async (req, res) => {
  try {
    const { id } = req.user;

    const ISTDateFormatted = dayjs
      .utc()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD");

    const todaysAttendance = await Attendance.findOne({
      where: { userId: id, day: ISTDateFormatted },
    });

    if (!todaysAttendance)
      return dataTemplate(
        res,
        { status: false, present: false, leave: false },
        { message: "Yet to update status." }
      );

    return dataTemplate(
      res,
      {
        status: true,
        present: todaysAttendance.present,
        leave: todaysAttendance.leave,
        leave_type: todaysAttendance.leave
          ? todaysAttendance.leave_half_day
            ? "half"
            : "full"
          : "",
      },
      { message: "Todays status." }
    );
  } catch (e) {
    console.log(e);
    return serverErrorTemplate(res, e.message);
  }
};

module.exports = { todaysStatus };
