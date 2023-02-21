import fetch from 'node-fetch';

const sendSMS = async (to, message) => {
  const response = await fetch(
    `https://app.notify.lk/api/v1/status?user_id=15211&api_key=IuGh8kEQy4wCUzmuDgxG`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export default sendSMS;
