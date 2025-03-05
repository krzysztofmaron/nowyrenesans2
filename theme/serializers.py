from rest_framework import serializers
from .models import PaidMember, Globals

class PaidMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaidMember
        fields = '__all__'

class GlobalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Globals
        fields = '__all__'