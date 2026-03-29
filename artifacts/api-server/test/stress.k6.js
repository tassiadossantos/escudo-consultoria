import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 }, // 20 VUs for 30s
    { duration: '1m', target: 50 },  // ramp up to 50 VUs
    { duration: '30s', target: 0 },  // ramp down
  ],
};

export default function () {
  const url = 'http://localhost:3000/api/messages';
  const payload = JSON.stringify({
    name: 'Stress Test',
    email: 'stress@test.com',
    message: 'Mensagem de stress',
    consentId: 1
  });
  const params = {
    headers: { 'Content-Type': 'application/json' },
  };
  const res = http.post(url, payload, params);
  check(res, {
    'status is 201 or 429': (r) => r.status === 201 || r.status === 429,
  });
  sleep(1);
}
