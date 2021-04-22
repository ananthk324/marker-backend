const { User, Attendance } = require("../../models");
const {
  badRequestTemplate,
  serverErrorTemplate,
  dataTemplate,
} = require("../../utils/responseTemplates");

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

const reportOfDay = async (req, res) => {
  try {
    const user = req.user;
    const { day } = req.params;

    console.log(day);

    if (user && !user.is_manager)
      return badRequestTemplate(res, "User has no admin privileges.");

    const ISTDateFormatted = dayjs
      .utc(day)
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD");

    const attendanceOfTheDay = await User.findAll({
      where: { removed: false },
      include: [
        {
          model: Attendance,
          where: { day: ISTDateFormatted },
          required: false,
          attributes: {
            exclude: ["id", "day", "userId", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: { exclude: ["removed", "createdAt", "updatedAt"] },
    }).then(data => JSON.parse(JSON.stringify(data)));

    const formattedAttendance = attendanceOfTheDay.reduce(
      (records, user) => {
        if (!user.attendances || !user.attendances.length) {
          delete user.attendances;
          user.marked = false;
          records.no_status.push(user);

          return records;
        }

        const status = { ...user.attendances[0] };

        delete user.attendances;

        user.marked = true;

        switch (status.present) {
          case true: {
            user.present = true;
            records.present.push(user);
            break;
          }
          case false: {
            user.leave = true;
            if (status.leave_half_day) {
              user.half_day_leave = true;
              records.half_day_leave.push(user);
            } else {
              user.full_day_leave = true;
              records.full_day_leave.push(user);
            }
            break;
          }
          default:
            break;
        }

        return records;
      },
      {
        present: [],
        full_day_leave: [],
        half_day_leave: [],
        no_status: [],
        day: ISTDateFormatted,
      }
    );

    return dataTemplate(res, formattedAttendance, {
      message: `Leave record of ${ISTDateFormatted}`,
    });
  } catch (e) {
    console.log(e);
    return serverErrorTemplate(res, e.message);
  }
};

module.exports = { reportOfDay };
