from django.db import models
from django.contrib import admin

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    verbose_name = 'Category'
    verbose_name_plural = 'Categories'
    list_display = ('name', 'description', 'created')
    search_fields = ('name',)