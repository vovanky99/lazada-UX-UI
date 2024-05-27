import axios from '~/api/axios';

export default async function getAdmin({
  name,
  birthday,
  role,
  department,
  gender,
  status,
  work_at,
  leave_off_work,
  born_country,
  born_city,
  born_district,
  born_ward,
  live_at_country,
  live_at_city,
  live_at_district,
  live_at_ward,
}) {
  try {
    const res = await axios.get('/api/admin/get-all-admin', {
      params: {
        name,
        birthday,
        role,
        department,
        gender,
        status,
        work_at,
        leave_off_work,
        born_country,
        born_city,
        born_district,
        born_ward,
        live_at_country,
        live_at_city,
        live_at_district,
        live_at_ward,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
