from rest_framework import serializers
from .models import PaidMember

class PaidMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaidMember
        fields = '__all__'