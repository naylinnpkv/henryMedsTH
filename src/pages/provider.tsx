import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@/styles/Home.module.css";
import BackToHome from "../../components/BackToHome";
import { useState } from "react";
import _ from "lodash";
import { Inputs, ISchedule, IUserInfo } from "../../models";
// import axios  from "axios";

const Provider = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  //   Custom hook to request basic provider info on LogIn
  //   const {providerID:id, providerName:name} = useProvider();

  // hard coded data
  const providerInfo: IUserInfo = {
    id: 1,
    name: "Test Provider",
  };

  // requesting schedule with providerID
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const result = await axios('/providerSchedules/:pid');
  //         setSchedules(result.data);

  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    /*
    setLoading(true);
    const res = await axios.Post('/provider/schedules',{...data,name,id})
    setSchedules([...schedules, res.data.schedules])
    setLoading(false);
    */
    setSchedules([...schedules, data]);
  };

  const timeFormatter = (time: string) => {
    const [h, m] = time.split(":");
    if (_.toNumber(h) >= 12) {
      let hour = _.toNumber(h) - 12;
      if (hour === 0) {
        hour += 12;
      }
      return `${_.toString(hour)}:${m} PM`;
    } else {
      let hour = _.toNumber(h);
      if (hour === 0) {
        hour += 12;
      }
      return `${_.toString(hour)}:${m} AM`;
    }
  };

  return (
    <>
      <BackToHome />
      <div style={{ margin: "auto", width: "50%", textAlign: "center" }}>
        <h2 style={{ color: "teal" }}>Welcome {providerInfo.name}!</h2>
        <h3 style={{ textAlign: "center" }}>Pick your schedule</h3>
        <div style={{ margin: "30px" }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.scheduleInput}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="date"
              {...register("date", { required: true })}
              style={{ marginBottom: "10px" }}
            />
            {errors.date && <span>This field is required</span>}
            <input
              type="time"
              {...register("from", { required: true })}
              style={{ marginBottom: "10px" }}
            />
            {errors.from && <span>This field is required</span>}
            <input
              type="time"
              {...register("to", { required: true })}
              style={{ marginBottom: "10px" }}
            />
            {errors.to && <span>This field is required</span>}
            <input type="submit" />
          </form>
        </div>

        {schedules.length > 0 && (
          <>
            <div>Your Current Schedule:</div>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexFlow: "wrap",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px",
              }}
            >
              {schedules.map((schedule) => (
                <li
                  key={`${schedule.date}${schedule.from}${schedule.to}`}
                  style={{ margin: "20px" }}
                >
                  <div>Date: {schedule.date}</div>
                  <div>From: {timeFormatter(schedule.from)}</div>
                  <div>To: {timeFormatter(schedule.to)}</div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Provider;
