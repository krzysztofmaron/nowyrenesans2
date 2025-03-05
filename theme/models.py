from django.db import models

# Create your models here.
class PaidMember(models.Model):
    email = models.EmailField()
    renewal_date = models.DateField()
    canceled = models.BooleanField(default=False)
    failed_payment = models.BooleanField(default=False)

    def __str__(self):
        return str(self.email) + ' | ' + str(self.renewal_date) + ' | ' + str(self.canceled)
    
    
class Globals(models.Model):
    one_month_price = models.IntegerField(default=0)
    three_month_price = models.IntegerField(default=0)
    twelve_month_price = models.IntegerField(default=0)
    user_count = models.IntegerField(default=0)
    courses_count = models.IntegerField(default=0)

    vsl_url = models.URLField()
    stripe_url = models.URLField()

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass
    
    @classmethod
    def get_instance(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj