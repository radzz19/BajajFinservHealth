# Postman Collection - Quick Start Guide

## 📥 How to Import

1. **Open Postman** (download from [postman.com](https://www.postman.com/downloads/) if needed)
2. Click **Import** button (top left)
3. Click **Upload Files**
4. Select `BFHL_API_Tests.postman_collection.json`
5. Click **Import**

## 📁 Collection Structure

The collection contains **30+ test cases** organized in 7 folders:

### 1️⃣ Health Check (1 test)
- GET /health - Verify server is running

### 2️⃣ Fibonacci Operations (4 tests)
- ✅ Valid (n=10)
- ✅ Zero input
- ❌ Negative number (422 error)
- ❌ String type (422 error)

### 3️⃣ Prime Number Operations (4 tests)
- ✅ Valid array [1-10]
- ✅ Large numbers
- ❌ Empty array (422 error)
- ❌ Not array (422 error)

### 4️⃣ LCM Operations (4 tests)
- ✅ Valid array
- ✅ Single number
- ✅ Multiple numbers
- ❌ Empty array (422 error)

### 5️⃣ HCF Operations (4 tests)
- ✅ Valid array
- ✅ Single number
- ✅ With zero
- ❌ Empty array (422 error)

### 6️⃣ AI Operations (6 tests)
- ✅ France capital → "Paris"
- ✅ India capital → "Delhi"
- ✅ Sky color → "Blue"
- ✅ Fastest animal → "Cheetah"
- ❌ Empty string (422 error)
- ❌ Not string (422 error)

### 7️⃣ Validation & Error Tests (4 tests)
- ❌ Empty body (400 error)
- ❌ Multiple keys (400 error)
- ❌ Invalid key (400 error)
- ❌ Invalid route (404 error)

## 🚀 How to Run Tests

### Run Individual Test
1. Expand a folder (e.g., "2. Fibonacci Operations")
2. Click on a test (e.g., "Fibonacci - Valid (n=10)")
3. Click **Send** button
4. View response in the bottom panel

### Run Entire Folder
1. Hover over a folder name
2. Click the **three dots** (...)
3. Select **Run folder**
4. Click **Run** in the Collection Runner

### Run All Tests
1. Click the **three dots** next to collection name
2. Select **Run collection**
3. Click **Run BFHL REST API - Complete Test Suite**
4. View results summary

## 📊 Expected Results

### Success Responses (200)
```json
{
  "is_success": true,
  "official_email": "radhika2502.be23@chitkara.edu.in",
  "data": <result>
}
```

### Error Responses (400/422/404/500)
```json
{
  "is_success": false,
  "error": "error message"
}
```

## 🎯 Test Results by Status Code

| Status Code | Count | Description |
|-------------|-------|-------------|
| **200** | 16 | Successful operations |
| **400** | 3 | Bad request (validation) |
| **422** | 10 | Unprocessable entity (type errors) |
| **404** | 1 | Route not found |

## 💡 Pro Tips

### 1. Environment Variables (Optional)
Create an environment with:
- Variable: `base_url`
- Value: `http://localhost:3000`

Then update requests to use `{{base_url}}/health`

### 2. Automated Tests
Add test scripts to verify responses automatically:

```javascript
// Example test script (Tests tab)
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has correct structure", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('is_success');
    pm.expect(jsonData.is_success).to.be.true;
});
```

### 3. Quick Testing Workflow
1. Start with **Health Check** to verify server
2. Test each operation folder sequentially
3. Review **Validation & Error Tests** to verify error handling
4. Run entire collection for final verification

## 🔍 What to Look For

### ✅ Success Cases
- Status code: **200**
- `is_success`: **true**
- `official_email`: present
- `data`: correct result

### ❌ Error Cases
- Status code: **400/422/404**
- `is_success`: **false**
- `error`: descriptive message

## 📝 Sample Test Scenarios

### Scenario 1: Quick Smoke Test
Run these 6 tests:
1. GET /health
2. Fibonacci - Valid (n=10)
3. Prime - Valid array
4. LCM - Valid array
5. HCF - Valid array
6. AI - France capital

### Scenario 2: Validation Testing
Run folder "7. Validation & Error Tests"

### Scenario 3: Complete Regression
Run entire collection (all 30+ tests)

## ⚠️ Before Testing

Make sure:
- ✅ Server is running (`npm start`)
- ✅ Server URL is `http://localhost:3000`
- ✅ No firewall blocking localhost

## 🎓 Expected Test Results

When you run all tests, you should see:
- **✅ Total Passed: 30+**
- **❌ Total Failed: 0**
- **⏱️ Average Response Time: < 100ms**

## 📞 Troubleshooting

**Connection Error**
- Ensure server is running
- Check port 3000 is not blocked
- Verify URL: `http://localhost:3000`

**Wrong Results**
- Check server logs for errors
- Verify environment variables (.env)
- Restart server if needed

---

**Happy Testing! 🚀**
