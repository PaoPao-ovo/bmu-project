import request from "@/utils/request";

export const TempGetService = (id) =>
  request.get('/get_temperature', {
    params: {
      bmu_id: id
    }
  })

export const VolGetService = (id) =>
  request.get('/get_voltage', {
    params: {
      bmu_id: id
    }
  })

export const AlarmGetService = (id) =>
  request.get('/get_alarm_report', {
    params: {
      bmu_id: id
    }
  })

export const GetHistoryVolService = (id, datatime) =>
  request.get('/get_history_voltage', {
    params: {
      bmu_id: id,
      date: datatime,
      rows: 500
    }
  })

export const GetHistoryTempService = (id, datatime) =>
  request.get('get_history_temperature', {
    params: {
      bmu_id: id,
      date: datatime,
      rows: 500
    }
  })

export const GetOnlineStateService = (id) =>
  request.get('/get_online_state', {
    params: {
      bmu_id: id
    }
  })