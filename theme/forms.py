from django import forms
from django.contrib.auth import authenticate

class CustomLoginForm(forms.Form):
    username = forms.CharField(
        max_length=150,
        widget=forms.TextInput(attrs={
            'class': 'block text-white font-inter w-full px-2 py-3 border border-userBorder rounded-md bg-admingray',
            'placeholder': 'username',
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'block text-white font-inter w-full px-2 py-3 border border-userBorder rounded-md bg-admingray',
            'placeholder': 'password',
        })
    )

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')

        if not username or not password:
            raise forms.ValidationError("Both fields are required.")

        user = authenticate(username=username, password=password)
        if not user:
            self.add_error('username', 'Invalid username or password')
        
        return cleaned_data