# Comprehensive API Testing Script
# Tests all endpoints with various edge cases

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "BFHL REST API - Comprehensive Testing" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000"
$testResults = @()

function Test-Endpoint {
    param(
        [string]$TestName,
        [string]$Method,
        [string]$Endpoint,
        [string]$Body,
        [int]$ExpectedStatus
    )
    
    Write-Host "Testing: $TestName" -ForegroundColor Yellow
    
    try {
        if ($Method -eq "GET") {
            $response = Invoke-WebRequest -Uri "$baseUrl$Endpoint" -Method $Method -UseBasicParsing
        } else {
            $response = Invoke-WebRequest -Uri "$baseUrl$Endpoint" -Method $Method -Body $Body -ContentType "application/json" -UseBasicParsing
        }
        
        $statusCode = $response.StatusCode
        $content = $response.Content
        
        $passed = $statusCode -eq $ExpectedStatus
        $status = if ($passed) { "✅ PASS" } else { "❌ FAIL" }
        
        Write-Host "  Status: $statusCode | Expected: $ExpectedStatus | $status" -ForegroundColor $(if ($passed) { "Green" } else { "Red" })
        Write-Host "  Response: $content`n" -ForegroundColor Gray
        
        return @{
            Test = $TestName
            Status = $statusCode
            Expected = $ExpectedStatus
            Passed = $passed
            Response = $content
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $content = $_.ErrorDetails.Message
        
        $passed = $statusCode -eq $ExpectedStatus
        $status = if ($passed) { "✅ PASS" } else { "❌ FAIL" }
        
        Write-Host "  Status: $statusCode | Expected: $ExpectedStatus | $status" -ForegroundColor $(if ($passed) { "Green" } else { "Red" })
        Write-Host "  Response: $content`n" -ForegroundColor Gray
        
        return @{
            Test = $TestName
            Status = $statusCode
            Expected = $ExpectedStatus
            Passed = $passed
            Response = $content
        }
    }
}

# Test 1: Health Check
Write-Host "`n=== GET /health ===" -ForegroundColor Magenta
$testResults += Test-Endpoint -TestName "Health Check" -Method "GET" -Endpoint "/health" -ExpectedStatus 200

# Test 2-6: Fibonacci Tests
Write-Host "`n=== Fibonacci Tests ===" -ForegroundColor Magenta
$testResults += Test-Endpoint -TestName "Fibonacci - Valid (10)" -Method "POST" -Endpoint "/bfhl" -Body '{"fibonacci": 10}' -ExpectedStatus 200
$testResults += Test-Endpoint -TestName "Fibonacci - Zero" -Method "POST" -Endpoint "/bfhl" -Body '{"fibonacci": 0}' -ExpectedStatus 200
$testResults += Test-Endpoint -TestName "Fibonacci - Negative (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"fibonacci": -5}' -ExpectedStatus 422
$testResults += Test-Endpoint -TestName "Fibonacci - String (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"fibonacci": "abc"}' -ExpectedStatus 422
$testResults += Test-Endpoint -TestName "Fibonacci - Float (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"fibonacci": 5.5}' -ExpectedStatus 422

# Test 7-11: Prime Tests
Write-Host "`n=== Prime Number Tests ===" -ForegroundColor Magenta
$testResults += Test-Endpoint -TestName "Prime - Valid Array" -Method "POST" -Endpoint "/bfhl" -Body '{"prime": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}' -ExpectedStatus 200
$testResults += Test-Endpoint -TestName "Prime - Empty Array (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"prime": []}' -ExpectedStatus 422
$testResults += Test-Endpoint -TestName "Prime - Not Array (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"prime": 5}' -ExpectedStatus 422
$testResults += Test-Endpoint -TestName "Prime - Array with Strings (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"prime": [1, "2", 3]}' -ExpectedStatus 422
$testResults += Test-Endpoint -TestName "Prime - Negative Numbers" -Method "POST" -Endpoint "/bfhl" -Body '{"prime": [-1, -2, 3, 5]}' -ExpectedStatus 200

# Test 12-15: LCM Tests
Write-Host "`n=== LCM Tests ===" -ForegroundColor Magenta
$testResults += Test-Endpoint -TestName "LCM - Valid Array" -Method "POST" -Endpoint "/bfhl" -Body '{"lcm": [12, 15, 20]}' -ExpectedStatus 200
$testResults += Test-Endpoint -TestName "LCM - Single Number" -Method "POST" -Endpoint "/bfhl" -Body '{"lcm": [42]}' -ExpectedStatus 200
$testResults += Test-Endpoint -TestName "LCM - Empty Array (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"lcm": []}' -ExpectedStatus 422
$testResults += Test-Endpoint -TestName "LCM - Not Array (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"lcm": "12,15"}' -ExpectedStatus 422

# Test 16-19: HCF Tests
Write-Host "`n=== HCF Tests ===" -ForegroundColor Magenta
$testResults += Test-Endpoint -TestName "HCF - Valid Array" -Method "POST" -Endpoint "/bfhl" -Body '{"hcf": [12, 18, 24]}' -ExpectedStatus 200
$testResults += Test-Endpoint -TestName "HCF - Single Number" -Method "POST" -Endpoint "/bfhl" -Body '{"hcf": [100]}' -ExpectedStatus 200
$testResults += Test-Endpoint -TestName "HCF - Empty Array (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"hcf": []}' -ExpectedStatus 422
$testResults += Test-Endpoint -TestName "HCF - With Zero" -Method "POST" -Endpoint "/bfhl" -Body '{"hcf": [0, 12, 18]}' -ExpectedStatus 200

# Test 20-22: AI Tests
Write-Host "`n=== AI Tests ===" -ForegroundColor Magenta
$testResults += Test-Endpoint -TestName "AI - Valid Question" -Method "POST" -Endpoint "/bfhl" -Body '{"AI": "What is the capital of France?"}' -ExpectedStatus 200
$testResults += Test-Endpoint -TestName "AI - Empty String (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"AI": ""}' -ExpectedStatus 422
$testResults += Test-Endpoint -TestName "AI - Not String (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"AI": 123}' -ExpectedStatus 422

# Test 23-27: Edge Cases
Write-Host "`n=== Edge Cases ===" -ForegroundColor Magenta
$testResults += Test-Endpoint -TestName "No Body (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{}' -ExpectedStatus 400
$testResults += Test-Endpoint -TestName "Multiple Keys (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"fibonacci": 5, "prime": [1,2,3]}' -ExpectedStatus 400
$testResults += Test-Endpoint -TestName "Invalid Key (should fail)" -Method "POST" -Endpoint "/bfhl" -Body '{"invalid": 123}' -ExpectedStatus 400
$testResults += Test-Endpoint -TestName "Invalid Route (should fail)" -Method "GET" -Endpoint "/invalid" -ExpectedStatus 404
$testResults += Test-Endpoint -TestName "POST to Health (should fail)" -Method "POST" -Endpoint "/health" -Body '{}' -ExpectedStatus 404

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$passed = ($testResults | Where-Object { $_.Passed -eq $true }).Count
$failed = ($testResults | Where-Object { $_.Passed -eq $false }).Count
$total = $testResults.Count

Write-Host "`nTotal Tests: $total" -ForegroundColor White
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host "`nSuccess Rate: $([math]::Round(($passed / $total) * 100, 2))%" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Yellow" })

if ($failed -gt 0) {
    Write-Host "`n❌ Failed Tests:" -ForegroundColor Red
    $testResults | Where-Object { $_.Passed -eq $false } | ForEach-Object {
        Write-Host "  - $($_.Test) (Status: $($_.Status), Expected: $($_.Expected))" -ForegroundColor Red
    }
}

Write-Host "`n========================================`n" -ForegroundColor Cyan
