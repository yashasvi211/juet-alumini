import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
 
const RegisterScreen = ({navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Contact details
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [github, setGithub] = useState('');

  // Professional details
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [jobFunction, setJobFunction] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // OTP state
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Track OTP verification status

  const handleSendOtp = async () => {
    try {
      const response = await fetch('http://192.168.29.144:5000/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('OTP Sent', `OTP has been sent to ${email}`);
        setIsOtpSent(true);
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://192.168.29.144:5000/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message);
        setIsOtpVerified(true); // Set OTP verified to true
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server');
    }
  };

  const handleRegister = async () => {
    // Check if OTP is verified
    if (!isOtpVerified) {
      Alert.alert('Error', 'Please verify your OTP before registering');
      return; // Prevent registration if OTP is not verified
    }

    const registrationData = {
      personal_details: {
        first_name: firstName,
        last_name: lastName,
        email,
        course,
        branch,
        password,
        about,
        roll_number: rollNumber,
        imageUrl,
      },
      contact_details: {
        facebook,
        twitter,
        linkedin,
        phone_number: phoneNumber,
        github,
      },
      professional_details: {
        company_name: companyName,
        role,
        job_function: jobFunction,
        from_date: fromDate,
        to_date: toDate,
      },
    };

    try {
      const response = await fetch('http://192.168.29.144:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message || 'Failed to register');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo or Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5xhMKkzYfW-jN_xS3F6XrJWQuAY1d8yv04A&s' }} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Course"
          value={course}
          onChangeText={setCourse}
        />
        <TextInput
          style={styles.input}
          placeholder="Branch"
          value={branch}
          onChangeText={setBranch}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="About"
          value={about}
          onChangeText={setAbout}
        />
        <TextInput
          style={styles.input}
          placeholder="Roll Number (optional)"
          value={rollNumber}
          onChangeText={setRollNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        {/* Contact details */}
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Facebook (optional)"
          value={facebook}
          onChangeText={setFacebook}
        />
        <TextInput
          style={styles.input}
          placeholder="Twitter (optional)"
          value={twitter}
          onChangeText={setTwitter}
        />
        <TextInput
          style={styles.input}
          placeholder="LinkedIn (optional)"
          value={linkedin}
          onChangeText={setLinkedin}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number (optional)"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="GitHub (optional)"
          value={github}
          onChangeText={setGithub}
        />

        {/* Professional details */}
        <Text style={styles.sectionTitle}>Professional Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Company Name (optional)"
          value={companyName}
          onChangeText={setCompanyName}
        />
        <TextInput
          style={styles.input}
          placeholder="Role (optional)"
          value={role}
          onChangeText={setRole}
        />
        <TextInput
          style={styles.input}
          placeholder="Job Function (optional)"
          value={jobFunction}
          onChangeText={setJobFunction}
        />
        <TextInput
          style={styles.input}
          placeholder="From Date (optional)"
          value={fromDate}
          onChangeText={setFromDate}
        />
        <TextInput
          style={styles.input}
          placeholder="To Date (optional)"
          value={toDate}
          onChangeText={setToDate}
        />

        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        {isOtpSent && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Show message and remove Register button after OTP verification */}
        {isOtpVerified ? (
          <Text style={styles.successMessage}>
            OTP verified! Please log in with your email and password.
          </Text>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#007BFF',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#007BFF',
  },
  successMessage: {
    textAlign: 'center',
    color: '#28a745',
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
