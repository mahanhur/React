const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

// 'analyze'라는 URL 요청이 들어오면 이미지를 분석해서 결과를 반환합니다.
app.get('/analyze', async (req, res) => {
  const imageUrl = req.query.url;
  const [result] = await client.textDetection(imageUrl);
  const detections = result.textAnnotations;
  const text = detections[0].description;
  res.send(text);
});

// 서버를 시작합니다.
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});