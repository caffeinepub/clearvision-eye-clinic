import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type Appointment = {
    patientName : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    preferredTime : Text;
    serviceType : Text;
  };

  module Appointment {
    public func compare(appointment1 : Appointment, appointment2 : Appointment) : Order.Order {
      Text.compare(appointment1.patientName, appointment2.patientName);
    };

    public func compareByEmail(appointment1 : Appointment, appointment2 : Appointment) : Order.Order {
      Text.compare(appointment1.email, appointment2.email);
    };
  };

  let appointments = Map.empty<Text, Appointment>();

  public shared ({ caller }) func bookAppointment(appointmentId : Text, patientName : Text, email : Text, phone : Text, preferredDate : Text, preferredTime : Text, serviceType : Text) : async () {
    if (appointments.containsKey(appointmentId)) { Runtime.trap("Appointment already exists") };
    let appointment : Appointment = {
      patientName;
      email;
      phone;
      preferredDate;
      preferredTime;
      serviceType;
    };
    appointments.add(appointmentId, appointment);
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    appointments.values().toArray().sort();
  };
};
