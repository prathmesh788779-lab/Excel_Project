import requests
import sys
from datetime import datetime
import json

class ResortAPITester:
    def __init__(self, base_url="https://sspark-resort.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'test': name,
                'error': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "api/", 200)

    def test_status_check_create(self):
        """Test status check creation"""
        data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        return self.run_test("Create Status Check", "POST", "api/status", 200, data)

    def test_status_check_get(self):
        """Test getting status checks"""
        return self.run_test("Get Status Checks", "GET", "api/status", 200)

    def test_wedding_enquiry(self):
        """Test wedding enquiry submission"""
        data = {
            "name": "Test Bride & Groom",
            "phone": "+91 9999999999",
            "email": "test@example.com",
            "event_type": "Wedding",
            "event_date": "2025-12-25",
            "guest_count": "200-300",
            "message": "Looking for a grand wedding venue"
        }
        return self.run_test("Wedding Enquiry", "POST", "api/enquiries/event", 200, data)

    def test_corporate_enquiry(self):
        """Test corporate enquiry submission"""
        data = {
            "name": "Corporate Manager",
            "phone": "+91 8888888888",
            "email": "corporate@company.com",
            "event_type": "Corporate Offsite",
            "event_date": "2025-06-15",
            "guest_count": "50-100",
            "message": "Need conference facilities for team offsite"
        }
        return self.run_test("Corporate Enquiry", "POST", "api/enquiries/event", 200, data)

    def test_contact_enquiry(self):
        """Test contact form submission"""
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "+91 7777777777",
            "subject": "General Inquiry",
            "message": "Interested in booking a room for vacation"
        }
        return self.run_test("Contact Enquiry", "POST", "api/enquiries/contact", 200, data)

    def test_get_event_enquiries(self):
        """Test getting event enquiries"""
        return self.run_test("Get Event Enquiries", "GET", "api/enquiries/event", 200)

    def test_get_contact_enquiries(self):
        """Test getting contact enquiries"""
        return self.run_test("Get Contact Enquiries", "GET", "api/enquiries/contact", 200)

def main():
    print("🏨 Silver Stone Park Resort - API Testing")
    print("=" * 50)
    
    tester = ResortAPITester()

    # Test all endpoints
    print("\n📡 Testing API Endpoints...")
    tester.test_root_endpoint()
    
    print("\n🔄 Testing Status Check APIs...")
    tester.test_status_check_create()
    tester.test_status_check_get()
    
    print("\n💒 Testing Wedding Enquiry APIs...")
    tester.test_wedding_enquiry()
    tester.test_get_event_enquiries()
    
    print("\n🏢 Testing Corporate Enquiry APIs...")
    tester.test_corporate_enquiry()
    
    print("\n📞 Testing Contact Form APIs...")
    tester.test_contact_enquiry()
    tester.test_get_contact_enquiries()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure.get('test', 'Unknown')}: {failure}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())