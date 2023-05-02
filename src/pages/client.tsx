import { useEffect, useState } from "react";
import BackToHome from "../../components/BackToHome";
import { IAvailableSlots, IUserInfo, ISelectedSlots } from "../../models";
import _ from "lodash";
import moment from "moment";

const Client = () => {
  const [availableSlots, setAvailableSlots] = useState<IAvailableSlots[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<ISelectedSlots | null>(
    null
  );

  //   Custom hook to request basic client info on LogIn
  //   const {clientId:id, clientName:name} = useClient();

  // hard coded client data and availableSlots
  const clientInfo: IUserInfo = {
    id: 2,
    name: "Test Client",
  };

  const mockAvailableSlots: IAvailableSlots[] = [
    {
      slotId: 1,
      providerId: 1,
      date: "2023-05-16",
      from: "12:00 PM",
      to: "4:00 PM",
    },
    {
      slotId: 2,
      providerId: 1,
      date: "2023-05-03",
      from: "12:00 PM",
      to: "4:00 PM",
    },
    {
      slotId: 3,
      providerId: 1,
      date: "2023-05-18",
      from: "12:00 PM",
      to: "4:00 PM",
    },
  ];

  // requesting available schdules with providerID
  useEffect(() => {
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
    setAvailableSlots(mockAvailableSlots);
  }, []);

  const isSelectedSlot = (id: number) =>
    selectedSlots !== null && selectedSlots.slotId === id;

  const isLessThan24hours = (slot: IAvailableSlots) => {
    const now = moment();
    const slotTime = moment(`${slot.date} ${slot.from}`);
    const diffInHours = slotTime.diff(now, "hours");
    return diffInHours < 24;
  };

  const handleSelection = (slot: IAvailableSlots) => {
    selectedSlots === null
      ? setSelectedSlots({
          ...slot,
          isConfirmed: false,
          selectedTime: new Date(),
        })
      : setSelectedSlots(null);
  };

  const handleConfirmation = () => {
    // checking 30 mins expiration
    const selectedTime = moment(selectedSlots?.selectedTime);
    const now = moment();

    const diffInMinutes = now.diff(selectedTime, "minutes");

    if (diffInMinutes > 30) {
      window.alert(
        "Reservations expire after 30 mins if not confirmed, please make new reservation"
      );
      setSelectedSlots(null);
      return;
    }

    setSelectedSlots((prev: any) => {
      if (prev !== null) {
        return { ...prev, isConfirmed: !prev.isConfirmed };
      }
    });
  };

  return (
    <>
      <BackToHome />

      <div style={{ margin: "auto", width: "50%", textAlign: "center" }}>
        <h2 style={{ color: "teal" }}>Welcome {clientInfo.name}!</h2>
        <h3 style={{ textAlign: "center" }}>Available Slots</h3>

        <ul style={{ listStyle: "none" }}>
          {availableSlots.map((slot) => (
            <li
              key={`${slot.date}:${slot.from}`}
              style={{
                margin: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <div
                  style={{
                    backgroundColor: isSelectedSlot(slot.slotId)
                      ? "green"
                      : "grey",
                    marginRight: "10px",
                  }}
                >
                  {slot.date} : {slot.from}-{slot.to}
                </div>

                {!isLessThan24hours(slot) && (
                  <button
                    style={{
                      marginRight: "10px",
                    }}
                    onClick={() => handleSelection(slot)}
                    disabled={
                      (selectedSlots !== null &&
                        selectedSlots?.slotId !== slot.slotId) ||
                      (selectedSlots?.isConfirmed &&
                        selectedSlots?.slotId === slot.slotId) ||
                      isLessThan24hours(slot)
                    }
                  >
                    {isSelectedSlot(slot.slotId) ? "Deselect" : "Select"}
                  </button>
                )}
                {isLessThan24hours(slot) && (
                  <h6 style={{ color: "red" }}>
                    Reservations must be made at least 24 hours in advance
                  </h6>
                )}
                {isSelectedSlot(slot.slotId) && (
                  <button onClick={handleConfirmation}>
                    {selectedSlots?.isConfirmed
                      ? "Cancel Confirmation"
                      : "Confirm"}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Client;
